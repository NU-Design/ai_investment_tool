import os

from llama_index.llms import OpenAI
from llama_index import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from IPython.display import Markdown, display
from dotenv import load_dotenv
from llama_index.vector_stores import AstraDBVectorStore

from info_aggregatpr import generate_all_company_data


def store_data_in_db(company_symbol):
    # 加载环境变量
    load_dotenv()

    FMP_API_KEY = os.getenv("FMP_API_KEY")

    generate_all_company_data(company_symbol, FMP_API_KEY)

    # 从环境变量获取数据库配置
    ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
    ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")

    # 初始化AstraDB存储
    astra_db_store = AstraDBVectorStore(
        token=ASTRA_DB_APPLICATION_TOKEN,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        collection_name="test2",  # 替换为你的集合名称
        embedding_dimension=1536,  # 根据你使用的模型可能需要调整
    )

    # 假设你从某个地方获取的文本已保存到"./data"目录下的文件中
    documents = SimpleDirectoryReader("./data").load_data()

    # 创建存储上下文
    storage_context = StorageContext.from_defaults(vector_store=astra_db_store)

    # 构建索引并将文档存储到Astra DB
    # 注意: 这一步实际上是在为文档创建向量表示并存储这些向量
    # 如果你只想简单地存储文档数据，可能需要调整这一步
    VectorStoreIndex.from_documents(documents, storage_context=storage_context)

    print("文档已成功存储到数据库。")


def query_data_in_db(query_string, company_symbol):

    # 从环境变量获取数据库配置
    ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
    ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    astra_db_store = AstraDBVectorStore(
        token=ASTRA_DB_APPLICATION_TOKEN,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        collection_name="test2",  # 替换为您的集合名称your_collection_name
        embedding_dimension=1536,  # 嵌入维度，根据您使用的模型可能需要调整
    )
    storage_context = StorageContext.from_defaults(vector_store=astra_db_store)

    index = VectorStoreIndex.from_vector_store(astra_db_store)

    # 转换为查询引擎
    query_engine = index.as_query_engine()

    # 执行查询
    # query_string = "For MSFT. Evaluate the capital allocation strategy including details on dividends, share repurchase plans, and significant investments outlined."
    query_string = (
        f"For {company_symbol} "
        + query_string
        + " ----do not give me the name of people just talk about the event --- give some number to supoort answer ---Prioritize quantitative answers with number -- Give some sensory data of financial reports, sentiment analysis data --more than 15 sentence to explain"
    )
    print(query_string)
    response = query_engine.query(query_string)

    print("查询结果:", response.response)
    return response.response


# 如果这是一个独立脚本，直接调用函数
if __name__ == "__main__":
    store_data_in_db()
